'use client';

import { useQuery } from '@apollo/client';
import { Listbox, ListboxItem, User } from '@nextui-org/react';
import { GET_PEOPLES } from 'app/lib/peopleQueries';
import { ListboxWrapper } from 'app/ui/ListboxWrapper';

export default function Page() {

    const { data, loading, error } = useQuery(GET_PEOPLES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ListboxWrapper>
            <Listbox
                aria-label="Actions"
                onAction={(key) => alert(key)}
            >
                {data.peoples.map((people: { id: number; first_name: string; last_name: string; photo: string }) => (
                    <ListboxItem key={people.id} textValue={people.first_name}><User
                        name={people.first_name + ' ' + people.last_name}
                        description="Product Designer"
                        avatarProps={{
                            src: process.env.DIRECTUS_URL + people.photo
                        }}
                    /></ListboxItem>
                ))}
            </Listbox>
        </ListboxWrapper>
    );
}