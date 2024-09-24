import { faker } from '@faker-js/faker/locale/es';

export const generateUserMock = () => {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar()
    }
}