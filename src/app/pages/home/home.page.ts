import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CorreioService } from 'src/app/services/correio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correio : any = {};
  eventosCollection: any[] = []

  constructor(private correioService: CorreioService, private toastCtrl: ToastController, private alertCtrl: AlertController) {}

  localizarObjeto(evento){
    let codigoObjeto: string = evento.detail.value;
   
    if(codigoObjeto.length<3){
      return;
    }

    this.correioService.localizarObjeto(codigoObjeto)
    
    .then(response=>{
      let correio: any = response;
      
      this.eventosCollection = correio.objetos[0].eventos;
            
      if(this.eventosCollection==undefined){       
        this.enviarToast('Objeto não encontrado.');
        return;
      }
      console.table(this.eventosCollection);
    })
    .catch(erro=>{ // Nem o meu nem o do professor
      console.log(erro);
      this.enviarToast('Objeto não encontrado.');
      //this.enviarAlert('Objeto não encontrado.');
    });
  }
  
  async enviarToast(mensagem : string){
    const toast = await this.toastCtrl.create({
    message: mensagem,
    color: 'danger',
    position: 'middle',
    buttons:[{ 
      text: 'OK', 
      role: 'cancel'
    }]
    });
    toast.present();
  }

  async enviarAlert(mensagem : string){
    const alert = await this.alertCtrl.create({
    message: mensagem,
    buttons:[{ 
      text: 'OK', 
      role: 'cancel'
    }]
    });
    alert.present();
  }

  async presentAlert(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'ERRO',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  arrumarData(dtHrCriado : string){
    
    let dataArrumada = dtHrCriado.split('T')

    let diaUpdate = dataArrumada[0].split('-')
    diaUpdate[3] = diaUpdate[2] + "/" + diaUpdate[1] + "/" + diaUpdate[0];
    


    let horaUpdate = dataArrumada[1].substr(-10,5);
    horaUpdate = horaUpdate.replace(':','h');
    
    console.log(diaUpdate);
    
    return diaUpdate[3] + ' - ' +horaUpdate;
  }

}
