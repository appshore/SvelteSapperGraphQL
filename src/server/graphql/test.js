import { gql } from 'apollo-server-express'

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    genre: 'Fantasy',
    authorId: 1,
  },
  {
    id: 2,
    title: 'Jurassic Park',
    genre: 'Retro futur',
    authorId: 2,
  },
  {
    id: 3,
    title: 'Harry Potter and himself',
    genre: 'Fantasy',
    authorId: 1,
  },
  {
    id: 4,
    title: 'Maigret fait des siennes',
    genre: 'Police',
    authorId: 3,
  },
];

const authors = [
  {
    id: 1,
    name: 'J.K. Rowling',
    bookId: [1, 3]
  },
  {
    id: 2,
    name: 'Michael Crichton',
    bookId: [2]
  },
  {
    id: 3,
    name: 'Georges Simenon',
    bookId: [4]
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    id: Int!
    title: String
    genre: String
    author: Author
  }

  type Author {
    id: Int!
    name: String
    books: [Book]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    author(id: Int!): Author
    authors: [Author]
    book(id: Int!): Book
    books: [Book]
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers = {
  Query: {
    author: (_, { id }) => authors.find(a => a.id == id),
    authors: () => authors,
    book: (_, { id }) => books.find(b => b.id == id),
    books: () => books,
  },

  Author: {
    books: author => books.filter( b => b.authorId == author.id),
  },

  Book: {
    author: book => authors.find( a => a.id == book.authorId),
  },
}