type UserData = {
    id: `user_uuid_${number}`; // typescript 4.1~
    name: string;
}

type UserDetail = {
    id: `detail_uuid_${number}`; // typescript 4.1~
    // 1
    userDataId: `user_uuid_${number}`; // UserData.id
    age: number;
    sex: 'man' | 'woman'
}

// 2
type FindById = <E extends { id: any }, I>(entities: E[], id: I) => E;

const findById: FindById =
    // 3
    (entities, id) => entities.find(entity => entity.id === id) as typeof entities[number];

(() => {
    // 4
    const users: UserData[] = [...Array(10)].map((_, i: number) => ({
        id: `user_uuid_${i}`,
        name: `name_${i}`
    }));

    // 4
    const details: UserDetail[] = users.map((user: UserData, i: number) => ({
        id: `detail_uuid_${i}`,
        userDataId: user.id,
        age: 24,
        sex: i % 2 === 0 ? 'man' : 'woman'
    }))

    // 5
    const user: UserData = findById(users, 'user_uuid_1');
    console.table(user)

    // 5
    const detail: UserDetail = findById(details, 'user_uuid_1')
    console.table(detail)
})()
