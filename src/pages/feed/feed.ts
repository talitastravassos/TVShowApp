import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { SerieDetalhesPage } from '../serie-detalhes/serie-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public lista_populares = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  public objeto_feed = {
    titulo: "Samantha 'root' Grooves",
    data: "May 16, 2016",
    descricao: "hey sweetie, are you busy?",
    qntd_likes: 12,
    qntd_comments: 4,
    hora_postagem: "11h ago"
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,  
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abrirDetalhes(tvshow){
    console.log(tvshow);
    this.navCtrl.push(SerieDetalhesPage, { id: tvshow.id });
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
    this.movieProvider.getPopularMovie( this.page ).subscribe(
      
      data => {

        const response = (data as any);
        const objeto_home = JSON.parse(response._body);

        if(newpage){
          this.lista_populares = this.lista_populares.concat(objeto_home.results);
          this.infiniteScroll.complete();
          console.log(this.lista_populares);
          console.log(this.page);    

        }else{
          this.lista_populares = objeto_home.results;
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
