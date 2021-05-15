import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Cliente } from 'src/app/interfaces/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private dbPath = '/app-front';

  clientsRef: AngularFireList<Cliente>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.clientsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Cliente> {
    return this.clientsRef;
  }

  create(cliente: Cliente): any {
    return this.clientsRef.push(cliente);
  }

  update(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.clientsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.clientsRef.remove();
  }
}
