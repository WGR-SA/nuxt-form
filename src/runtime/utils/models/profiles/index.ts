import BaseProfile from './BaseProfile'
import TypeORMProfile from './TypeORMProfile'

const ProfileFactory: {[key: string]: any} = {
  base: BaseProfile,
  typeorm: TypeORMProfile,
}

export {
  ProfileFactory
}