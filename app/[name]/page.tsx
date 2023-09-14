interface Props {
    params: {
      name: string;
    };
  }

export default function Page({ params }: Props){
    const name = params.name;
    return(
        <div>
            <h1>Hello {name}</h1>
        </div>
    )
}