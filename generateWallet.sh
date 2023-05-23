#!/usr/bin/env bash

PRIVATE_KEY=$(openssl rand -hex 32)
PUBLIC_ADDRESS=$(echo $PRIVATE_KEY | npx ethereum-private-key-to-address)
echo ""
echo "Private Key: 0x$PRIVATE_KEY"
echo "Public Address: $PUBLIC_ADDRESS"