export interface SmallProfile {
  id: number;
  preferredName: string;
  profileLargeAWSKey: string;
  account: {
    username: string;
  };
  distance: number;
}
