const {faker} = require('@faker-js/faker')
const fs = require('fs')

faker.locale = 'vi'

const randomUserList = (n) => {
    if (n <= 0) return [];
    const userList = [];
    const roleArr = ['admin', 'manager', 'user'];
    //loop and push user
    Array.from(new Array(n)).forEach(() => {
        const user = {
            id: faker.datatype.number(),
            avatar: faker.image.imageUrl(400, 400),
            fullname: faker.name.fullName(),
            email: faker.email,
            username: faker.name.firstName(),
            role: roleArr[Math.floor(Math.random() * roleArr.length)],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        userList.push(user);
    })
    return userList;
}

const randomCategoryList = (n) => {
    if (n<= 0) return [];
    const categoryList = [];
    const categoryArr = ['Thể thao', 'Giải Trí', 'Thời sự', 'Kinh Doanh'];
    //loop and push category

    Array.from(new Array(n)).forEach(() => {
        const category = {
            categoryId: faker.datatype.uuid(),
            id: faker.datatype.uuid(),
            name: categoryArr[Math.floor(Math.random * categoryArr.length)],
            slug: faker.lorem.slug(),
            image: faker.image.imageUrl(400, 400),
            description: faker.lorem.paragraphs(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        categoryList.push(category);
    }) 
    return categoryList;
}
const randomPostList = (categoryList, numOfPosts) => {
    if (numOfPosts <= 0) return [];
    const status = ['published', 'drafted'];
    const postList = [];
    for (const category of categoryList){
        Array.from(new Array(numOfPosts)).forEach(() => {
            const post = {
                id: faker.datatype.uuid(),
                title: faker.lorem.sentence(),
                slug: faker.lorem.slug(),
                excerpt: faker.lorem.words(),
                content: faker.lorem.paragraphs(),
                featuredImage: faker.image.imageUrl(400, 400),
                status: status[Math.floor(Math.random * status.length)],
                allowComment: Boolean,
                isPage: Boolean,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
            postList.push(post)
        })
    }
    return postList;
}
//IIFE
(() => {
    const userList = randomUserList(20)
    const categoryList = randomCategoryList(4)
    const postList = randomPostList(categoryList, 5)
    const db = {
        users: userList,
        categories: categoryList,
        posts: postList,
    }
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully');
    })

})()