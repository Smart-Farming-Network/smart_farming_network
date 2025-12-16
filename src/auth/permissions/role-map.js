import { Role } from '@/generated/prisma';
import { PERMISSIONS } from './permission-keys';

export const ROLE_PERMISSIONS = {
    [Role.ADMIN]: '*',

    [Role.FARMER]: [
        PERMISSIONS.PRODUCT_VIEW,
        PERMISSIONS.PRODUCT_CREATE,
        PERMISSIONS.PRODUCT_UPDATE,
    ],

    [Role.INVESTOR]: [
        PERMISSIONS.PRODUCT_VIEW,
    ],

    [Role.USER]: [
        PERMISSIONS.PROFILE_VIEW,
        PERMISSIONS.PROFILE_UPDATE,
    ],
}
