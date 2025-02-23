export function checkPathStartsWith(
  pathname: string,
  allowedPathStarts: string[],
  excludedPathStarts: string[] = [],
) {
  return allowedPathStarts.some((pathStart) => {
    if (pathStart === '/') {
      return pathname === '/'
    }  

    const pathMatch = pathname.startsWith(pathStart)

    if (!pathMatch) {
      return false
    }

    return !checkPathStartsWith(pathname, excludedPathStarts)
  });
}
