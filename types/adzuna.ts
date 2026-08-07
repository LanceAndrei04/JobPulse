export interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  created: string;

  company: {
    display_name: string;
  };

  category: {
    label: string;
    tag: string;
  };

  location: {
    display_name: string;
    area: string[];
  };

  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;

  contract_time?: string;
  contract_type?: string;

  latitude?: number;
  longitude?: number;

  redirect_url?: string;

  
}
