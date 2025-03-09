export function POST(body){
    const newToken = `${body.email}:${body.password}`;
    return new Response(newToken);
}