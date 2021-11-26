import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface FriendsEpisode {
  isPlayed: boolean;
  path: string;
}

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  private readonly episodeList = [
    '/assets/friends/01.mp4', 
    '/assets/friends/02.mp4',
    '/assets/friends/03.mp4',
    '/assets/friends/04.mp4',
    '/assets/friends/05.mp4',
    '/assets/friends/06.mp4',
    '/assets/friends/07.mp4',
    '/assets/friends/08.mp4',
    '/assets/friends/09.mp4',
    '/assets/friends/10.mp4',
  ]
  currentlyPlayingEp: string;
  private readonly episodes: FriendsEpisode[] = [];
  constructor() { }

  ngOnInit(): void {
    for (const ep of this.episodeList) {
      this.episodes.push({ isPlayed: false, path: ep });
    }
    
    this.beginPlaying();
  }

  private beginPlaying() {
    const episode = this.episodes.find(x => x.isPlayed === false);
    if (episode) {
      console.warn(episode);
      this.currentlyPlayingEp = episode.path;
      console.log(`playing ${this.currentlyPlayingEp}`);
      episode.isPlayed = true;
    } else {
      this.resetPlayed();
      this.beginPlaying();
    }
  }

  private resetPlayed() {
    this.episodes.forEach(ep => {
      ep.isPlayed = false;
    });
  }
  playNext() {
    this.beginPlaying();
  }

  loading() {
    console.log('loading')
  }
  loaded() {
    console.log('loaded');
  }

}
