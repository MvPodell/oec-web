'use client';
import React, {useState, useEffect} from "react";
import { Trip } from "@/app/dashboard/trips/page";
import { getUsers } from "@/config/firestore";
import { Profile } from "@/app/form/signup/page";

interface TripQueueProps {
    tripMembers: string[];
}

export const TripQueue: React.FC<TripQueueProps> = ({ tripMembers }) => {

    const [members, setMembers] = useState<string[]>([]);
    const [users, setUsers] = useState<Profile[]>([]);

    useEffect(()=> {
        const fetchUsers = async () => {
            try {
            const userProfiles = await getUsers();
            setUsers(userProfiles); 
            } catch (error) {
                console.error("Error fetching users: ", error);
                setUsers([]);
            }
        } 
        fetchUsers();
    }, []);
    

    useEffect(() => {
        if (tripMembers) {
            setMembers(tripMembers);
        }
    }, [tripMembers]);
    
    const signedUpUsers = users.filter(user => members.includes(user.id));

    return (
        <div>
            { signedUpUsers.length > 0 ? (
                <ol>
                {signedUpUsers.map(user => (
                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                ))}
                </ol>
            ) : (
                <p>Empty</p>
            )}
            
            
        </div>
    );
};