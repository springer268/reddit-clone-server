import * as Wrappers from './wrappers'

/**
 * The current Database Wrapper.
 * Should be Database and Implementation agnostic
 */
export const DB = new Wrappers.TestDatabaseWrapper()
