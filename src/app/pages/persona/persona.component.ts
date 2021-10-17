import { Persona } from '../../_model/persona';
import { PersonaService } from './../../_service/persona.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private personaService: PersonaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //Solo cuando se hace next()
    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    })

    this.personaService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
    //Apenas carga la página
    /*this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPersona: number) {
    this.personaService.eliminar(idPersona).subscribe(() => {
      this.personaService.listar().subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('SE ELIMINÓ');
      });
    });
  }

  mostrarMas(e: any) {
    this.personaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
}
