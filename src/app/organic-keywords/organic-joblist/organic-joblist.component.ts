import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-organic-joblist',
  templateUrl: './organic-joblist.component.html',
  styleUrls: ['./organic-joblist.component.scss']
})
export class OrganicJoblistComponent implements OnInit {
  // Banner Results
  jobResults: any = [{jobType: 'Matching products', count: 359},
  {jobType: 'Product data extracted', count: 123}, {jobType: 'Brand Products', count: 23}];
  // Table Headers
  jobHeaders = ['Product Title', 'Description', 'Price', 'User rating', 'Bullet points', 'Number of images', 'By Info'];
  // Table Header title
  headerTitle: String = 'Crawl result for Keyword';
  productDetails: any = [];
  jobId: any;
  totalItems: number;
  isLoading: boolean;
  currentpageIndex: number;
  limitPerPage: number = 5;
  offsetPage: number = 0;
  mockResponse = {
    'pageNum': 8,
    'pageSize': 5,
    'totalPages': 16,
    'totalItems': 444,
    'items': [
      {
        'id': '5d6f97cbfc13ae4c85000064',
        'productTitle': 'Loss control mv acc-driv',
        'description': 'Computerized Tomography (CT Scan) of Right Patella',
        'price': '$64.80',
        'userRating': 3,
        'bulletPoints': [
          'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra',
          'in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis',
          'lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo',
          'habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris'
        ],
        'numberOfImages': 8,
        'byInfo': 'Runolfsson Inc'
      },
      {
        'id': '5d6f97cbfc13ae4c85000065',
        'productTitle': 'Nephrotic syn, prolifer',
        'description': 'Supplement Right Tarsal Joint with Synthetic Substitute, Percutaneous Approach',
        'price': '$65.15',
        'userRating': 4,
        'bulletPoints': [
          'convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum',
          'turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris',
          'lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta',
          'nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at',
          'non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
          'vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque',
          'quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus'
        ],
        'numberOfImages': 3,
        'byInfo': 'Friesen Inc'
      },
      {
        'id': '5d6f97cbfc13ae4c85000066',
        'productTitle': 'Depressive psychosis-mod',
        'description': 'Repair Sternum, External Approach',
        'price': '$51.46',
        'userRating': 5,
        'bulletPoints': [
          'pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique',
          'ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          'accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget',
          'quis orci nullam molestie nibh in lectus pellentesque at nulla',
          'hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem'
        ],
        'numberOfImages': 8,
        'byInfo': 'Koch, Armstrong and Schmeler'
      },
      {
        'id': '5d6f97cbfc13ae4c85000067',
        'productTitle': 'Twin pregnancy-antepart',
        'description': 'Insertion of Internal Fixation Device into Left Femoral Shaft, Percutaneous Endoscopic Approach',
        'price': '$50.79',
        'userRating': 1,
        'bulletPoints': [
          'quis lectus suspendisse potenti in eleifend quam a odio in',
          'interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
          'ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu',
          'convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum',
          'nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate'
        ],
        'numberOfImages': 8,
        'byInfo': 'Orn Inc'
      },
      {
        'id': '5d6f97cbfc13ae4c85000068',
        'productTitle': 'Foreign body in nose',
        'description': 'Excision of Left Breast, Via Natural or Artificial Opening Endoscopic',
        'price': '$57.43',
        'userRating': 5,
        'bulletPoints': [
          'ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
          'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer',
          'massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea',
          'pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna',
          'potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam'
        ],
        'numberOfImages': 10,
        'byInfo': 'Haley and Sons'
      }
    ]
  };
  constructor(public jobsService: JobsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.currentpageIndex = 0;
    this.isLoading = true;
    this.route.params
    .subscribe((params: any) => {
      this.jobId = params['jobId'];
      this.getJobDetails(this.jobId);
    });
  }

  getJobDetails(jobId) {
    this.jobsService.getKeyWordRelevanceJobDetails(jobId).then((res: any) => {
      this.totalItems = res.totalItems;
      this.productDetails = res.items;
      this.isLoading = false;
    }).catch(err => {
      console.log('Error while fetching Job Details', err);
      this.productDetails = this.mockResponse.items;
      this.isLoading = false;
    });
  }

  onPageChange(offset) {
    this.currentpageIndex = offset;
    console.log('CurrentPageIndex', this.currentpageIndex);
    const currentIndex = (offset - 1) * this.limitPerPage;
    this.offsetPage = currentIndex;
    this.isLoading = true;
    this.getJobDetails(this.offsetPage);
  }

}
