import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import * as bcrypt from 'bcrypt';
import { ApiTags } from "@nestjs/swagger";


@Entity()
export class Authentication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    fullName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column()
    sector: string;

    @UpdateDateColumn()
    updatedAt: Date;
   

}