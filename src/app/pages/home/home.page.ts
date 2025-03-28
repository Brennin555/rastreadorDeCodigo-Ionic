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
  eventosCollection: any[] = [];
  icone : any;
  codigo = '';


  constructor(private correioService: CorreioService, private toastCtrl: ToastController, private alertCtrl: AlertController) {}

  localizarObjeto(evento){
    let codigoObjeto: string;
    codigoObjeto = evento.detail.value;   
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
    .catch(erro=>{
      console.log(erro);
      this.enviarToast('Objeto não encontrado.');
    });

    //this.icone = this.statusObjeto(codigo);
    console.log(this.eventosCollection);

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

  arrumarData(dtHrCriado : string){
    
    let dataArrumada = dtHrCriado.split('T')

    let diaUpdate = dataArrumada[0].split('-')
    diaUpdate[3] = diaUpdate[2] + "/" + diaUpdate[1] + "/" + diaUpdate[0];

    let horaUpdate = dataArrumada[1].substr(-10,5);
    horaUpdate = horaUpdate.replace(':','h');
    
    return diaUpdate[3] + ' - ' +horaUpdate;
  }

   statusObjeto(codigo : any){
    let icone: string;

    if(codigo == 'BDI'){
      icone = "checkmark-circle";
    }
    else{
      if(codigo == 'LDI'){
        icone = "checkmark-circle-outline";
      }
      else{
        icone = "time-outline";
      }       
    }

    console.log(codigo);
    return icone;
  }

  reduzirDescricao(descricao : string){
    let descricaoNova: string = descricao;

    if(descricao == 'Objeto em trânsito - por favor aguarde'){
      descricaoNova = descricao.substr(-40,18);
    }

    return descricaoNova;
  }
}
