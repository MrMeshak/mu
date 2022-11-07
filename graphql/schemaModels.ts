import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import prisma from '../prisma/prismaClient';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },

    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    phone: { type: GraphQLString },
    profileImg: { type: GraphQLString },

    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },

    addresses: {
      type: new GraphQLList(AddressType),
      async resolve(parent, args, context) {
        const addresses = await prisma.address.findMany({
          where: {
            user: parent.id
          }
        });
        if (!addresses) {
          throw Error('Addresses could not be found');
        }
        return addresses;
      }
    },

    orders: {
      type: new GraphQLList(OrderType),
      async resolve(parent, args, context) {}
    },

    reviews: {
      type: new GraphQLList(ReviewType),
      async resolve(parent, args, context) {}
    },

    upVotedReviews: {
      type: new GraphQLList(ReviewType),
      async resolve(parent, args, context) {}
    }
  })
});

export const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    streetAddress2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    postCode: { type: GraphQLString }
  })
});

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) }
  })
});

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },

    color: { type: GraphQLString },

    stock: { type: GraphQLInt },
    sales: { type: GraphQLInt },

    productId: { type: GraphQLID },
    product: {
      type: ProductType,
      async resolve(parent, args, context) {}
    },

    orderItems: {
      type: new GraphQLList(OrderItemLinkType)
    }
  })
});

export const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  fields: () => ({
    id: { type: GraphQLID },

    quantity: { type: GraphQLInt },

    itemId: { type: GraphQLID },
    item: {
      type: ItemType,
      async resolve(parent, args, context) {}
    },

    orderId: { type: GraphQLID },
    order: {
      type: OrderType,
      async resolve(parent, args, context) {}
    }
  })
});

export const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },

    orderStatus: { type: GraphQLString },

    paymentStatus: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
    totalCost: { type: GraphQLInt },
    discount: { type: GraphQLInt },

    shippingStatus: { type: GraphQLString },
    shippingMethod: { type: GraphQLString },
    shippingCost: { type: GraphQLInt },

    promoCode: { type: GraphQLString },

    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },

    userId: { type: GraphQLID },
    user: {
      type: UserLinkType,
      async resolve(parent, args, context) {}
    },

    shippingAddressId: { type: GraphQLID },
    shippingAddress: {
      type: AddressType,
      async resolve(parent, args, context) {}
    },

    billingAddressId: { type: GraphQLID },
    billingAddress: {
      type: AddressType,
      async resolve(parent, args, context) {}
    }
  })
});

export const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },

    rating: { type: GraphQLInt },
    description: { type: GraphQLInt },

    authorId: { type: GraphQLID },
    author: {
      type: UserLinkType,
      async resolve(parent, args, context) {}
    }
  })
});

export const UserLinkType = new GraphQLObjectType({
  name: 'UserLink',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },

    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    phone: { type: GraphQLString },
    profileImg: { type: GraphQLString },

    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },

    addresses: {
      type: new GraphQLList(AddressType),
      async resolve(parent, args, context) {}
    }
  })
});

export const OrderItemLinkType = new GraphQLObjectType({
  name: 'OrderItemLink',
  fields: () => ({
    id: { type: GraphQLID },

    orderStatus: { type: GraphQLString },

    paymentStatus: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
    totalCost: { type: GraphQLInt },
    discount: { type: GraphQLInt },

    shippingStatus: { type: GraphQLString },
    shippingMethod: { type: GraphQLString },
    shippingCost: { type: GraphQLInt },

    promoCode: { type: GraphQLString },

    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },

    shippingAddressId: { type: GraphQLID },
    shippingAddress: {
      type: AddressType,
      async resolve(parent, args, context) {}
    }
  })
});
