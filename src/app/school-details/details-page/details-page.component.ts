import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { iSchool } from 'src/app/core/models/school-model';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  idSchool!: string;
  school!: iSchool | undefined;
  constructor(public route: ActivatedRoute, public store: Store<AppState>) {}

  ngOnInit(): void {
    this.idSchool = this.route.snapshot.paramMap.get('id') as string;
    this.store
      .select((state) => state.schools)
      .subscribe({
        next: (data) => {
          this.school = data.schools.find((item) => item._id === this.idSchool);
        },
      });
  }
}
