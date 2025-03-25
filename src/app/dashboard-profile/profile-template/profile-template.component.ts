import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-profile-template',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.css']
})
export class ProfileComponent implements OnChanges {
  @Input() user!: User;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private modalService: ModalService) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.pattern(/^\d+$/)]],
      gender: [''], 
    });
    
  }

  ngOnChanges(): void {
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }
  onSave(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log('Usuario actualizado con éxito:', response);
          alert('Cambios guardados con éxito.');
          this.modalService.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al guardar los cambios.');
        },
      });
    } else {
      alert('Por favor, revisa los campos e inténtalo de nuevo.');
    }
  }
  
  private loadUserData(user: User): void {
    this.profileForm.patchValue(user);
  }
  
  onCancel(): void {
    this.modalService.closeModal(); // Cierra el modal sin guardar cambios
  }
}
