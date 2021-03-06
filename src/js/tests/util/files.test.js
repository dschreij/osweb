import { parseUrl } from '../../osweb/util/files'

describe('parseUrl', () => {
  it('Should return an URL Object when supplied with a valid URL', () => {
    expect(parseUrl('http://osweb.nl').href).toBe('http://osweb.nl/')
    expect(parseUrl('/test-osexp/capybaras.osexp').href).toBe('http://localhost/test-osexp/capybaras.osexp')
  })

  it('Should return false when supplied with an invalid URL', () => {
    expect(parseUrl('http://')).toBe(false)
  })
})
