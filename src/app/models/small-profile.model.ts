export interface SmallProfile {
  id: number;
  preferredName: string;
  profileLargeAWSKey: string;
  account: {
    username: string;
    address: {
      distance: number;
    };
  };
}
