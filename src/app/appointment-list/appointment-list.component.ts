import { Component } from '@angular/core';
import { Cita } from '../models/appointment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  citaForm: FormGroup;

  constructor() {
    this.citaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      nombreCliente: new FormControl('', [Validators.required]),
      doctorResponsable: new FormControl('', [Validators.required]),
    });
  }
  
  nuevaCita: Cita = {
    id: 1,
    titulo: '',
    fecha: new Date(),
    horario: '',
    nombreCliente: '',
    doctorResponsable: ''
  };
  citas: Cita[] = [];
  citaSeleccionada: Cita | null = null;
  modoEdicion = false;

  agregarCita(cita: Cita) {
    cita.id = this.obtenerNuevoId();
    this.citas.push(cita);
    this.resetForm();
  }

  editarCita(index: number) {
    this.citaSeleccionada = { ...this.citas[index] };
    this.modoEdicion = true;
    this.parchearDatosEnFormulario(this.citaSeleccionada);
  }

  actualizarCita(cita: Cita) {
    const index = this.citas.findIndex(c => c.id === this.citaSeleccionada?.id);
    if (index !== -1) {
      this.citas[index] = { ...cita };
    }
    this.citaSeleccionada = null;
    this.modoEdicion = false;
    this.resetForm();
  }

  eliminarCita(index: number) {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      this.citas.splice(index, 1);
    }
  }

  parchearDatosEnFormulario(cita: Cita) {
    
    this.citaForm.patchValue({
      titulo: cita.titulo,
      fecha: cita.fecha,
      horario: cita.horario,
      nombreCliente: cita.nombreCliente,
      doctorResponsable: cita.doctorResponsable
    });
  }

  resetForm() {
    this.nuevaCita = {
      id: this.obtenerNuevoId(),
      titulo: '',
      fecha: new Date(),
      horario: '',
      nombreCliente: '',
      doctorResponsable: ''
    };
  
    this.citaForm.reset();
  }

  obtenerNuevoId() {
    const ids = this.citas.map(c => c.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}
