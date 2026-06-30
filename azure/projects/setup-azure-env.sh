#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# ==========================================
# Variables (Change these as needed)
# ==========================================
# A unique prefix for your resources
PREFIX="devopsguru"
# Generate a random string to ensure registry name is unique globally
RANDOM_STR=$(LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 4)

RESOURCE_GROUP="${PREFIX}-rg"
LOCATION="eastus" # You can change this to a region closer to you (e.g., centralindia)

# ACR name must be alphanumeric only, globally unique, and 5-50 characters
ACR_NAME="${PREFIX}acr${RANDOM_STR}"

AKS_CLUSTER_NAME="${PREFIX}-aks"

echo "=========================================="
echo "Starting Azure Infrastructure Setup..."
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo "ACR Name: $ACR_NAME"
echo "AKS Cluster: $AKS_CLUSTER_NAME"
echo "=========================================="

# 1. Create a Resource Group
echo "[1/4] Creating Resource Group ($RESOURCE_GROUP)..."
az group create --name $RESOURCE_GROUP --location $LOCATION -o table

# 2. Create Azure Container Registry (ACR)
# Basic SKU is the most cost-effective for learning/development
echo "[2/4] Creating Azure Container Registry ($ACR_NAME)..."
az acr create --resource-group $RESOURCE_GROUP \
              --name $ACR_NAME \
              --sku Basic \
              -o table

# 3. Create Azure Kubernetes Service (AKS) cluster
# We use a small node size (Standard_B2s) to save your credits
echo "[3/4] Creating AKS Cluster ($AKS_CLUSTER_NAME). This may take 5-10 minutes..."
az aks create \
    --resource-group $RESOURCE_GROUP \
    --name $AKS_CLUSTER_NAME \
    --node-count 1 \
    --node-vm-size Standard_D2s_v3 \
    --generate-ssh-keys \
    -o table

# 4. Attach ACR to AKS
# This gives your AKS cluster permission to pull images from your private ACR
echo "[4/4] Attaching ACR to AKS..."
az aks update -n $AKS_CLUSTER_NAME -g $RESOURCE_GROUP --attach-acr $ACR_NAME -o table

# 5. Get Kubernetes Credentials
# This configures your local 'kubectl' to connect to the new cluster
echo "Configuring kubectl to connect to the new cluster..."
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER_NAME --overwrite-existing

echo "=========================================="
echo "Setup Complete! 🎉"
echo "Your ACR login server is: $(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query loginServer --output tsv)"
echo "You can test your cluster connection by running: kubectl get nodes"
echo "=========================================="
