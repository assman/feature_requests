import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Client } from '../client.model'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const now = new Date();

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[]
  loading: boolean
  addIcon = faPlusSquare
  hasSubmitted: boolean = false
  modalRef: any
  newClientModalRef: any
  featureTitle: string
  featureDescription: string
  featureDate: any
  featureArea: string
  clientID: number
  calendarIcon = faCalendarAlt
  clientIndex: number
  minDate: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  clientName: string


  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true
    this.loadClients()
  }

  openNewClientModal(content) {
    this.newClientModalRef = this.modalService.open(content, { centered: true })
  }
  open(content, id: number, index: number) {
    this.clientID = id
    this.clientIndex = index
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  createClient(editForm: NgForm) {
    this.hasSubmitted = true
    return this.apiService.createClient(this.clientName).subscribe((data) => {
      editForm.reset()
      this.hasSubmitted = false
      this.newClientModalRef.close()
      Swal.fire({
        type: 'success',
        title: 'Client Added',
        text: 'New client has been added successfully',
        onClose: () => {
          this.clientName = null
          this.loading = true
          this.loadClients()
        }
      });
    })
  }

  createFeature(editForm: NgForm) {
    var dateToString: string = this.featureDate.year + '-' + this.featureDate.month + '-' + this.featureDate.day
    this.hasSubmitted = true
    var priority = this.clients[this.clientIndex].features.length
    var productAreas = { "Assessments": "AS", "Billing": "BL", "Recruit": "RC", "Reports": "RP", "None": "NO" };
    return this.apiService.createFeature(this.featureTitle, this.featureDescription, dateToString, productAreas[this.featureArea], this.clientID, priority).subscribe((data) => {
      editForm.reset()
      this.hasSubmitted = false
      this.modalRef.close()
      Swal.fire({
        type: 'success',
        title: 'Feature Added',
        text: 'A new feature has been added for the client',
        onClose: () => {
          this.clientID = null
          this.loading = true
          this.loadClients()
        }
      });
    })
  }

  loadClients() {
    return this.apiService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.loading = false
    })
  }

}
