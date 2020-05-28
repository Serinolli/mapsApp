import { Component, ViewChild, ElementRef } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx'

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
  marker: any;
  marker2: any;
  marker3: any;
  marker4: any;
  marker5: any;

  
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
      icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.BOUNCE})

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(-22.4807481, -48.5633106),
        map: this.map,
        title: "Barra Bonita, cidade simpatia!",
        //colocar ícones
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        animation: google.maps.Animation.DROP})

        const marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(-22.5122094, -48.5575188),
          map: this.map,
          title: "Perigoso aqui em!",
          //colocar ícones
          icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          animation: google.maps.Animation.DROP})

        const marker3 = new google.maps.Marker({
          position: new google.maps.LatLng(-22.5133455, -48.7329254),
          map: this.map,
          title: "Tem nada aqui",
          //colocar ícones
          icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          animation: google.maps.Animation.DROP})

          const marker4 = new google.maps.Marker({
            position: new google.maps.LatLng(-22.608839, -48.791712),
            map: this.map,
            title: "LPNET é muito bom",
            //colocar ícones
            icon: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
            animation: google.maps.Animation.DROP})

            const marker5 = new google.maps.Marker({
              position: new google.maps.LatLng(-22.675501, -48.668346),
              map: this.map,
              title: "Será que tem muita areia aqui?",
              //colocar ícones
              icon: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
              animation: google.maps.Animation.DROP})
  
  }
  //"ionViewDidEnter" quando a página for aparecer, o mapa será chamado, ou seja, o mapa carrega APÓS a página.
  ionViewDidEnter() {
    this.showMap();
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
