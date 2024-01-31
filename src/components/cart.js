import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import CartService from "../api/cartService";
import { Form, Formik } from "formik";

const Cart = () => {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    console.log("[Fetching cart items]");
    const response = CartService.getCartItems();

    response
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          if (res.data.cartItems) {
            setCartItems(res.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          //   console.log("final output ::: ", values);
          // addProductToCart();
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formikProps) => {
        const { values, setFieldValue } = formikProps;
        return (
          <Form>
            <Flex direction={"row"} gridGap={20}>
              <Flex direction={"column"} gap={6}>
                {cartItems &&
                  cartItems.cartItems.map((item) => (
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      width={[300, 500, 600, 800]}
                    >
                      <Image
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                      />

                      <Stack>
                        <CardBody>
                          <Heading size="md" marginRight={10}>
                            {item.name}
                          </Heading>

                          <Text
                            fontWeight={500}
                            fontSize={"2xl"}
                            color={"grey"}
                          >
                            ${item.price}
                          </Text>
                          <Text fontWeight={500} color={"lightsalmon"}>
                            Quantity : {item.quantity}
                          </Text>
                        </CardBody>

                        <CardFooter gap={3}>
                          <Button variant="link" color={"lightgray"}>
                            Delete
                          </Button>
                          {"|"}
                          <Button variant="link" color={"lightgray"}>
                            Move to wishlist
                          </Button>
                        </CardFooter>
                      </Stack>
                    </Card>
                  ))}
              </Flex>
              {cartItems && (
                <Flex direction={"column"} width={400}>
                  <Stack gridGap={6}>
                    <Heading size="md" marginRight={1}>
                      Total Price : $ {cartItems.totalPrice}
                    </Heading>
                    <Button
                      variant="solid"
                      color={"black"}
                      colorScheme="cyan"
                      isLoading={formikProps.isSubmitting}
                      type="submit"
                    >
                      Checkout
                    </Button>
                  </Stack>
                </Flex>
              )}
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Cart;
