const extractReleaseRr = require('./helper/extractReleasePr');
const extractPrStatus = require('./helper/extractPrStatus.js');

module.exports = async ({github, context, core}) => {
  const { owner, repo } = context.repo;
  const releasePr = await extractReleaseRr({ github, owner, repo });

  if (!releasePr) {
    core.notice('No release PR found');
    core.setOutput('ready', 'false')
    return;
  }

  const prNumber = releasePr.number;

  let retries = 0;
  const maxRetries = 5;
  const retryInterval = 5000;
  let prStatus;

  do {
    prStatus = await extractPrStatus({ github, owner, repo, prNumber });

    if (prStatus.isPending) {
      core.notice(`Release PR is still pending. Retrying in ${retryInterval / 1000} seconds...`);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    } else if (prStatus.isFailure) {
      core.warning('PR has failed checks. No automerge will be performed');
      core.setFailed('PR has failed');
      break;
    } else {
      core.notice('PR is ready to be merged');
      core.setOutput('ready', 'true');
      break;
    }
  } while (retries < maxRetries);

  if (retries >= maxRetries) {
    core.warning('Maximum retries reached. PR is still pending.');
    core.setFailed('PR will not be able to get merged');
  }
}