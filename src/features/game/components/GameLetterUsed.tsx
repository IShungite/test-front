import { Grid, GridItem } from "@chakra-ui/react";

interface Props {
  lettersUsed: Set<string>;
}

const GameLetterUsed = ({ lettersUsed }: Props) => {
  return (
    <div>
      <div>Letters used:</div>
      <Grid templateColumns="repeat(4, 20px)">
        {Array.from(lettersUsed).map((letter) => (
          <GridItem key={letter}>{letter}</GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default GameLetterUsed;
