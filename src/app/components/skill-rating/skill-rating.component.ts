import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-rating',
  templateUrl: './skill-rating.component.html',
  styleUrls: ['./skill-rating.component.scss'],
})
export class SkillRatingComponent implements OnInit {
  private readonly STAR_NUMBER: number = 5;

  @Input() rating: number = 0;

  fullStars: number[];
  emptyStars: number[];
  isHalfStart: boolean = false;

  ngOnInit(): void {
    this.fullStars = Array(this.numberOfFullStars());
    this.emptyStars = Array(this.numberOfEmptyStars());
    this.isHalfStart = this.rating % 1 !== 0;
  }

  numberOfFullStars(): number {
    return Math.floor(this.rating);
  }

  numberOfEmptyStars(): number {
    return this.STAR_NUMBER - Math.ceil(this.rating);
  }
}
