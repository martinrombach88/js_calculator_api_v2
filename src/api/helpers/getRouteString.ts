export default function getRouteString(
  routeName: string,
  port: number
): string {
  return `Port ${port} server received query at route '${routeName}'.`;
}
