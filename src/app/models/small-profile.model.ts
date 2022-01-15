export interface SmallProfile {
  id: number;
  preferredName: string;
  profileLargeAwsKey: string;
  account: {
    username: string;
    address: {
      distance: number;
    };
  };
}
