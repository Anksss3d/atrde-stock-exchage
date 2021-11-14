from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import torch
import torch.nn as nn
import numpy as np
import time

def get_prediction(input):
	data = pd.read_csv("tradeserver_training.csv")

	price = data[['close']].copy()
	scaler = MinMaxScaler(feature_range=(-1, 1))
	price['close'] = scaler.fit_transform(price['close'].values.reshape(-1,1))


	input_dim = 1
	hidden_dim = 32
	num_layers = 2
	output_dim = 1


	class LSTM(nn.Module):
		def __init__(self, input_dim, hidden_dim, num_layers, output_dim):
			super(LSTM, self).__init__()
			self.hidden_dim = hidden_dim
			self.num_layers = num_layers
			self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
			self.fc = nn.Linear(hidden_dim, output_dim)


		def forward(self, x):
			h0 = torch.zeros(self.num_layers, x.size(0),
			self.hidden_dim).requires_grad_()
			c0 = torch.zeros(self.num_layers, x.size(0),
			self.hidden_dim).requires_grad_()
			out, (hn, cn) = self.lstm(x, (h0.detach(), c0.detach()))
			out = self.fc(out[:, -1, :])
			return out


	model = LSTM(input_dim=input_dim, hidden_dim=hidden_dim,
	output_dim=output_dim, num_layers=num_layers)


	PATH="mymodel.zip"

	model.load_state_dict(torch.load(PATH))
	model.eval()

	md = model(torch.Tensor([input]))
	pred = scaler.inverse_transform([[md.item()]])[0]
	print("prediction: ", pred[0])
	return pred[0]


