import { Persona } from '../../../_model/persona';
import { PersonaService } from '../../../_service/persona.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellidos': new FormControl('', Validators.required),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

  }

  get f() { return this.form.controls; }

  initForm() {
    //EDITAR, por lo tanto carga la data a editar
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPersona),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direccion)
        });
      });
    }
  }

  operar() {

    if (this.form.invalid) { return; }

    let persona = new Persona();
    persona.idPersona = this.form.value['id'];
    persona.nombres = this.form.value['nombres'];
    persona.apellidos = this.form.value['apellidos'];
    persona.dni = this.form.value['dni'];
    persona.telefono = this.form.value['telefono'];
    persona.direccion = this.form.value['direccion'];

    if (this.edicion) {
      //MODIFICAR
      this.personaService.modificar(persona).subscribe(() => {
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      //INSERTAR
      this.personaService.registrar(persona).subscribe(() => {
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['persona']);
  }

}
