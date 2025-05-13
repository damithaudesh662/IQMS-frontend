export type Institute = {
  id: string;
  institute_name: string;
  field: string;
  address: string;
};

export type adminInfo = {
  instituteName: string;
  displayName: string;
  email: string;
  password: string;
  contactEmail: string;
  contactNumber: string;
  address: string;
  field: string;
};

export type InstituteData = {
  institute_name: string;
  address: string;
  institute_queues: {
    count: number;
  };
};
