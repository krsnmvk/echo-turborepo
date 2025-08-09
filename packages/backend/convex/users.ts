import { mutation, query } from './_generated/server';

export const getMany = query({
  args: {},

  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();

    return users;
  },
});

export const create = mutation({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const users = await ctx.db.insert('users', { name: 'mukti' });

    return users;
  },
});
