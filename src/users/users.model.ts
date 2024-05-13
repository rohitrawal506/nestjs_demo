import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default:false})
  isAdmin:boolean;

  // async hashPassword(){
  //   this.password=await bcrypt.hash(this.password,10);
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);
