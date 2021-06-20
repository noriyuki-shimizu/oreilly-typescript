interface Entity<ID extends string> {
    id: ID;
}

interface UserData extends Entity<`user_uuid_${number}`> { // typescript 4.1~
    name: string;
}

interface UserDetail extends Entity<`detail_uuid_${number}`> { // typescript 4.1~
    userId: UserData['id'];
    age: number;
    sex: 'man' | 'woman'
}

type FindById = <E extends Entity<string>>(entities: E[], id: E['id']) => E | undefined

const findById: FindById =
    (entities, id) => entities.find(entity => entity.id === id);

(() => {
    const users = [...Array(10)].map<UserData>((_, i) => ({
        id: `user_uuid_${i}`,
        name: `name_${i}`
    }));

    const details = users.map<UserDetail>((user, i) => ({
        id: `detail_uuid_${i}`,
        userId: user.id,
        age: 24,
        sex: i % 2 === 0 ? 'man' : 'woman'
    }))

    const user = findById(users, 'user_uuid_1');
    console.table(user)

    const detail = findById(details, 'detail_uuid_1')
    console.table(detail)
})()