import { Component, ViewChild, ElementRef } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { iLocal } from '../interfaces/iLocal';

//Variável acessivel pelo java script quando este estiver dentro do type script
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  map: any;
  posicaoAtual: any;
  
public listaLocais: iLocal[] = [
{
    lat: -22.4807481,
    lng: -48.5633106,
    titulo: 'Barra Bonita, cidade simpatia!'
},
{
  lat: -22.5122094,
  lng: -48.55751886,
  titulo: 'Igaraçu (perigoso aqui em!)'
},
{
  lat: -22.5133455,
  lng: -48.7329254,
  titulo: 'Macatuba'
},
{
  lat: -22.608839,
  lng: -48.791712,
  titulo: 'Lençois Paulista'
},
{
  lat: -22.675501,
  lng: -48.668346,
  titulo: 'Areiopolis, vila da areia'
},

];
  
  //'map' declarado no html, pela # 
  //criada uma div de referência, irá apontar para o que for criado na variável "google"
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;



  constructor(private geolocation: Geolocation) { }

  public async showMap() {
   // const location1 = new google.maps.LatLng(-22.4807481, -48.5633106); 
        await this.buscaPosicao();
       
        
    const options = {
      //location é a variável criada acima
      center: this.posicaoAtual,
      zoom: 12,
      disableDefaultUI: true
    }

    //criação do mapa (apenas criado, lembrar de "colocar para aparecer", ou seja, chama-lo)
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    //Marcador na posição atual
    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Localização atual",
      //colocar ícones
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      animation: google.maps.Animation.BOUNCE});

      for(let local of this.listaLocais){
        this.adicionarMarcador(local);
      }
             
  }
  //"ionViewDidEnter" quando a página for aparecer, o mapa será chamado, ou seja, o mapa carrega APÓS a página.
  ionViewDidEnter() {
    this.showMap();
  }


  //Para não repetir o codigo do marcador (logo o de cima) 5x, cria-se uma classe, de forma que:
  private adicionarMarcador(Local: iLocal){
    const {lat, lng, titulo} = Local;

    const marcador = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: titulo
  });
}



  //o codigo para continuar recebendo a localização do usuário não pdoe ser posto solto, deve-se criar uma estrutura como:
  public async buscaPosicao() {
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
        lat: posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude
      }
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
  }
  

}
