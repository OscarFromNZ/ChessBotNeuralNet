class Neuron {
    constructor(network, numberOfInputs, name, layer) {
        // one weight per connection with prev layer
        this.weights = Array.from({ length: numberOfInputs }, () => Math.random());

        this.bias = Math.random();

        this.learningRate = network.learningRate;

        this.output = null;
        this.name = name;
        this.layer = layer;
    }

    forwardSend(inputs) {
        console.log(`\n⏩ Forward sending through neuron ${this.name} from ${this.layer} layer`);
        console.log(`⏩ His inputs: ${inputs}`);
        // AKA: total net input
        let weightedSum = inputs.reduce((sum, input, index) => sum + input * this.weights[index], 0);
        weightedSum += this.bias;

        // squash using logistic function
        let squashedWeightedSum = this.squashFunction(weightedSum);

        this.output = squashedWeightedSum; // saving it 4 future use

        return squashedWeightedSum;
    }

    // logistic function is what it's known as I believe
    squashFunction(weightedSum) {
        return 1 / (1 + (Math.pow(2.7182818284590452353602874713526624977572, -1 * weightedSum)));
    }

    backPropagate(totalError, prevLayer, results, targets) {
        console.log(`\nBack propagating through ol ${this.name}.`);
        console.log(`⏪ Current weights: \n🧍 ${this.weights}`);

        // looping through all weights
        for (let i = 0; i < this.weights.length; i++) {
            // delta rule
            let changeAmount = -(targets[i] - results[i]) * results[i] * (1 - results[i]) * prevLayer[i].output;

            // updating the weight
            this.weights[i] -= this.learningRate * changeAmount;

            let biasDelta = -(targets[i] - results[i]) * results[i] * (1 - results[i]);
            this.bias -= this.learningRate * biasDelta;
        }

        console.log(`⏪ New weights: \n🧍 ${this.weights}`);
        console.log(`Done back propagating through ${this.name}\n`);
    }

    calcGradient() {

    }
}

module.exports = Neuron;