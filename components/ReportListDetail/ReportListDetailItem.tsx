import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { getSum } from "lib";
//@ts-ignore
function SingleItem({ title, tran }) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex w="100%">
          <Text>{title}</Text>
          <Spacer />
          <Text> {Number(tran.amount).toFixed(2)}</Text>
        </Flex>
        <AccordionIcon opacity={0} />
      </AccordionButton>
    </AccordionItem>
  );
}

//@ts-ignore
function GroupList({ title, item }) {
  const amount = item.getDescriptionTotal();
  const keys = Object.keys(item);

  return (
    <AccordionItem>
      <AccordionButton>
        <Flex w="100%">
          <Text>{title}</Text>
          <Spacer />
          <Text> {Number(amount).toFixed(2)}</Text>
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <List>
          {keys.map((key, idx) => (
            <GroupItem key={key} title={key} trans={item[key]} />
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
}

//@ts-ignore
function GroupItem({ title, trans }) {
  const amount = getSum(trans);

  const header = title === "" ? "other" : title;

  if (trans.length === 1) {
    return (
      <AccordionItem>
        <AccordionButton>
          <Flex w="100%">
            <Text>{header}</Text>
            <Spacer />
            <Text> {Number(trans[0].amount).toFixed(2)}</Text>
          </Flex>
          <AccordionIcon opacity="0" />
        </AccordionButton>
      </AccordionItem>
    );
  } else
    return (
      <ListItem>
        <AccordionItem>
          <AccordionButton>
            <Flex w="100%">
              <Text>{header}</Text>
              <Spacer />
              <Text> {Number(amount).toFixed(2)}</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <List>
              {trans.map((t, idx) => (
                <ListItem key={idx}>
                  <Flex w="100%">
                    <Text>
                      {t.date.day}.{t.date.month}.{t.date.year}
                    </Text>
                    <Spacer />
                    <Text> {Number(t.amount).toFixed(2)}</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </ListItem>
    );
}

//@ts-ignore
export default function ReportListDetailItem({ title, item }) {
  const items = [];

  if (item.isSingleItem()) {
    items.push(<SingleItem title={title} tran={item.getSingleTrans()} />);
  } else {
    items.push(<GroupList title={title} item={item} />);
    // for (const [key, value] of Object.entries(item)) {
    //   console.log("title=", title, "key=", key);
    //   items.push(<GroupItem key={key} title={title} trans={value} />);
    // }
  }

  const amount = item.getDescriptionTotal();

  return <Accordion allowMultiple>{items}</Accordion>;
}
