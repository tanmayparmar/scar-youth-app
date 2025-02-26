export interface People {
  id: number;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: any;
  date_updated: any;
  first_name: string;
  middle_name: any;
  last_name: string;
  phone: string;
  date_of_birth: any;
  email: any;
  house_id: { name: string };
  status: string;
  college: any;
  course: any;
  current_employer: any;
  profession: any;
  is_looking_for_job: boolean;
  immigration_status_id: number;
  referred_by: any;
  ambrish_diksha_date: any;
  yds_canada_joining_date: any;
  last_month_rent_paid: boolean;
  maintenance_paid: boolean;
  member_category_id: number;
  has_car: boolean;
  emergency_contact_city: any;
  emergency_contact_name: any;
  emergency_contact_phone: any;
  public_notes: any;
  photo: {
    id: string;
    type: string;
    title: string;
  };
  attendances: any[];
}
