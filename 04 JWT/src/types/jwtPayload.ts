import { JwtPayload } from 'jsonwebtoken';

export type JwtPayloadType = JwtPayload & {
  id: string;
  username: string;
};

// export interface IJwtPayload extends JwtPayload {
//   id: string;
//   username: string;
// }
