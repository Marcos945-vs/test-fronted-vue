import type { cardsType, followCard, musicCards, productsCards, socialiconCards, profileCard, upcommingLists, userCard, paymentGateway, recentTrans, backIcon,imgCard } from './types/card';
/*import tabler icons*/
import {
    BrandFacebookIcon,
    BrandGithubIcon,
    BrandInstagramIcon,
    BrandTwitterIcon,
    MapPinIcon,
    DatabaseIcon,
    PhoneIcon,
    ScreenShareIcon,
    MailIcon,
    LayoutGridIcon,
    ArchiveIcon,
    UserIcon,
    GiftIcon,
    GitBranchIcon,
    CardboardsIcon
} from 'vue-tabler-icons';

import user1 from '@/assets/images/profile/user-1.jpg';
import user2 from '@/assets/images/profile/user-2.jpg';
import user3 from '@/assets/images/profile/user-3.jpg';
import user4 from '@/assets/images/profile/user-4.jpg';
import img1 from '@/assets/images/blog/blog-img1.jpg';
import img2 from '@/assets/images/blog/blog-img2.jpg';
import img3 from '@/assets/images/blog/blog-img3.jpg';
/*--Products Cards Images--*/
import proimg1 from '@/assets/images/products/s4.jpg';
import proimg2 from '@/assets/images/products/s5.jpg';
import proimg3 from '@/assets/images/products/s4.jpg';
import proimg4 from '@/assets/images/products/s11.jpg';
/*--Payment gateways--*/
import icon1 from "@/assets/images/svgs/icon-paypal.svg";
import icon2 from "@/assets/images/svgs/icon-office-bag.svg";
import icon3 from "@/assets/images/svgs/icon-master-card.svg";
import icon4 from "@/assets/images/svgs/icon-pie.svg";

/*--Blog Cards--*/
const blogCard: cardsType[] = [
    {
        avatar: user1,
        coveravatar: img1,
        read: '2 min Read',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        link: '/',
        category: 'Social',
        name: 'Georgeanna Ramero',
        view: '9,125',
        comments: '3',
        time: 'Mon, Dec 19'
    },
    {
        avatar: user2,
        coveravatar: img2,
        read: '2 min Read',
        title: 'Intel loses bid to revive antitrust case against patent foe Fortress',
        link: '/',
        category: 'Gadget',
        name: 'Georgeanna Ramero',
        view: '4,150',
        comments: '38',
        time: 'Sun, Dec 18'
    },
    {
        avatar: user3,
        coveravatar: img3,
        read: '2 min Read',
        title: 'COVID outbreak deepens as more lockdowns loom in China',
        link: '/',
        category: 'Health',
        name: 'Georgeanna Ramero',
        view: '9,480',
        comments: '12',
        time: 'Sat, Dec 17'
    }
];

/*--Follow Cards--*/
const followerCard: followCard[] = [
    {
        title: 'Andrew Grant',
        location: 'El Salvador',
        avatar: user1
    },
    {
        title: 'Leo Pratt',
        location: 'Bulgaria',
        avatar: user2
    },
    {
        title: 'Charles Nunez',
        location: 'Nepal',
        avatar: user3
    }
];

/*--Music Cards--*/
const musicCard: musicCards[] = [
    {
        title: 'Uptown Funk',
        subheader: 'Jon Bon Jovi',
        img: img1
    },
    {
        title: 'Blank Space',
        subheader: 'Madonna',
        img: img2
    },
    {
        title: 'Lean On',
        subheader: 'Jennifer Lopez',
        img: img3
    }
];

/*--Products Cards--*/
const productsCard: productsCards[] = [
    {
        title: 'Boat Headphone',
        link: '/',
        photo: proimg1,
        salesPrice: 375,
        price: 285,
        rating: 4
    },
    {
        title: 'MacBook Air Pro',
        link: '/',
        photo: proimg2,
        salesPrice: 650,
        price: 900,
        rating: 5
    },
    {
        title: 'Red Valvet Dress',
        link: '/',
        photo: proimg3,
        salesPrice: 150,
        price: 200,
        rating: 3
    },
    {
        title: 'Cute Soft Teddybear',
        link: '/',
        photo: proimg4,
        salesPrice: 285,
        price: 345,
        rating: 2
    }
];

/*--Social Cards--*/
const socialiconCard: socialiconCards[] = [
    {
        name: 'facebook',
        icon: BrandFacebookIcon,
        color: 'primary'
    },
    {
        name: 'instagram',
        icon: BrandInstagramIcon,
        color: 'error'
    },
    {
        name: 'github',
        icon: BrandGithubIcon,
        color: 'info'
    },
    {
        name: 'twitter',
        icon: BrandTwitterIcon,
        color: 'secondary'
    }
];

/*--Profile Cards--*/
const profileCards: profileCard[] = [
    {
        title: 'Andrew Grant',
        subtitle: 'Technology Director',
        avatar: user1
    },
    {
        title: 'Leo Pratt',
        subtitle: 'Telecom Analyst',
        avatar: user2
    },
    {
        title: 'Charles Nunez',
        subtitle: 'Environmental Specialist',
        avatar: user3
    }
];

/*--Upcomming Activity Cards--*/
const upcommingCards: upcommingLists[] = [
    {
        icon: MapPinIcon,
        title: 'Project Omega',
        subtitle: 'Draft',
        rank: 'John Doe',
        bgcolor: 'primary'
    },
    {
        icon: DatabaseIcon,
        title: 'Project Gamma',
        subtitle: 'Discovery',
        rank: 'Mary Major',
        bgcolor: 'secondary'
    },
    {
        icon: PhoneIcon,
        title: 'Project Delda',
        subtitle: 'Execution',
        rank: 'Jane Doe',
        bgcolor: 'warning'
    },
    {
        icon: ScreenShareIcon,
        title: 'Project Alpha',
        subtitle: 'Execution',
        rank: 'John Doe',
        bgcolor: 'error'
    },
    {
        icon: MailIcon,
        title: 'Project Beta',
        subtitle: 'Delivered',
        rank: 'Richard Roe',
        bgcolor: 'success'
    }
];

const cardsSam = [
  {
    title: "Active projects ",
    subtitle: "Summary",
    description: "Number of ongoing projects",
    number: "8",
    color: "primary",
    actionLabel: "Ver proyectos",
    to: '/TableProject'
  },
  {
    title: "Artifacts",
    subtitle: "Summary",
    description: "Number of registered artifacts",
    number: "4",
    color: "success",
    actionLabel: "View artifacts",
    to: '/TableArtifact'
  },
  {
    title: "Modules",
    subtitle: "Summary",
    description: "Number of registered modules",
    number: "7",
    color: "info",
    actionLabel: "View Modules",
    to: '/TableModule'
  }
];


/*--User Cards--*/
const userCards: userCard[] = [
    {
        title: 'Andrew Grant',
        subtitle: '3 mutual friends',
        avatar: user1,
        userGroup: [
            {
                icon: user1
            },
            {
                icon: user2
            },
            {
                icon: user3
            }
        ],
    },
    {
        title: 'Leo Pratt',
        subtitle: '3 mutual friends',
        avatar: user2,
        userGroup: [
            {
                icon: user1
            },
            {
                icon: user2
            },
            {
                icon: user3
            }
        ],
    },
    {
        title: 'Charles Nunez',
        subtitle: '3 mutual friends',
        avatar: user3,
        userGroup: [
            {
                icon: user1
            },
            {
                icon: user2
            },
            {
                icon: user3
            }
        ],
    },
    {
        title: 'Lora Powers',
        subtitle: '3 mutual friends',
        avatar: user4,
        userGroup: [
            {
                icon: user1
            },
            {
                icon: user2
            },
            {
                icon: user3
            }
        ],
    },
]

/*--Payment gateways--*/
const paymentGateways: paymentGateway[] = [
    {
        img: icon1,
        title: 'Paypal',
        subtitle: 'Big Brands',
        rank: '+$6235',
        disable: '',
        bgcolor: "primary",
    },
    {
        img: icon2,
        title: 'Wallet',
        subtitle: 'Bill payment',
        rank: '-$345',
        disable: 'emphasis',
        bgcolor: "success",
    },
    {
        img: icon3,
        title: 'Credit Card',
        subtitle: 'Money reversed',
        rank: '+$2235',
        disable: '',
        bgcolor: "warning",
    },
    {
        img: icon4,
        title: 'Refund',
        subtitle: 'Bill Payment',
        rank: '-$32',
        disable: 'emphasis',
        bgcolor: "error",
    },
];

/*--Recent Transaction--*/
const recentTransaction: recentTrans[] = [
    {
        title: '09:30 am',
        subtitle: 'Payment received from John Doe of $385.90',
        textcolor: 'primary',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '10:00 am',
        subtitle: 'New sale recorded',
        textcolor: 'secondary',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment was made of $64.95 to Michael',
        textcolor: 'success',
        boldtext: false,
        line: true,
        link: '',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New sale recorded',
        textcolor: 'warning',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '09:30 am',
        subtitle: 'New arrival recorded',
        textcolor: 'error',
        boldtext: true,
        line: true,
        link: '#ML-3467',
        url: ''
    },
    {
        title: '12:00 am',
        subtitle: 'Payment Done',
        textcolor: 'success',
        boldtext: false,
        line: false,
        link: '',
        url: ''
    },
]

const backIconData: backIcon[] = [
    {
        color: "bg-secondary",
        icon: LayoutGridIcon,
        title: "460",
        subtitle: "New Products",
    },
    {
        color: "bg-error",
        icon: ArchiveIcon,
        title: "50",
        subtitle: "Pending Apps",
    },
    {
        color: "bg-primary",
        icon: UserIcon,
        title: "80",
        subtitle: "Customers",
    },
    {
        color: "bg-success",
        icon: GiftIcon,
        title: "15",
        subtitle: "Birthday Gifts",
    },
    {
        color: "bg-warning",
        icon: CardboardsIcon,
        title: "1800",
        subtitle: "Total Budgets",
    },
    {
        color: "bg-info",
        icon: GitBranchIcon,
        title: "90",
        subtitle: "Best Designers",
    },
]

const imgCardData: imgCard[] = [
    {
        image: proimg1,
        color: "secondary",
      },
      {
        image: proimg2,
        color: "error",
      },
      {
        image: proimg4,
        color: "primary",
      },
]

export { blogCard, followerCard, musicCard, productsCard, socialiconCard, profileCards, upcommingCards, cardsSam, userCards, paymentGateways, recentTransaction, backIconData,imgCardData }