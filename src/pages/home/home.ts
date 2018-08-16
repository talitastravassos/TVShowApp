import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { SerieDetalhesPage } from '../serie-detalhes/serie-detalhes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    MovieProvider
  ]
})
export class HomePage {

  public lista_latest = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public tvshow;
  public page = 1;
  public infiniteScroll; 



  constructor(
    public navCtrl: NavController,
    public seriesProvider: MovieProvider,
    public loadingCtrl: LoadingController
     ) {

  }

  abrirLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  fecharLoading(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  abrirDetalhes(tvshow){
    console.log(tvshow);
    this.navCtrl.push(SerieDetalhesPage, { id: tvshow.id });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);    
  }


  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes( newpage: boolean = false ){

    this.abrirLoading();
    this.seriesProvider.getLatestMovie( this.page ).subscribe(
      
      data => {

        const response = (data as any);
        const objeto_home = JSON.parse(response._body);

        if(newpage){
          this.lista_latest = this.lista_latest.concat(objeto_home.results);
          this.infiniteScroll.complete();
          console.log(this.lista_latest);
          console.log(this.page);     

        }else{
          this.lista_latest = objeto_home.results;
        }
        console.log( objeto_home );
        this.fecharLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }, error => {
        console.log(error);
        this.fecharLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}

