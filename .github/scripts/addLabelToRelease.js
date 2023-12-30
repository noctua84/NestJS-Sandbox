const extractReleasePr = require('./helper/extractReleasePr');

module.exports = async ({github, context, core}) => {
  const { owner, repo } = context.repo;
  let labelAdded = false;
  const releasePr = await extractReleasePr({github, owner, repo});

  if (releasePr) {
    core.notice(`Found release PR: ${releasePr.number}`);

    await github.rest.issues.addLabels({
      issue_number: releasePr.number,
      owner,
      repo,
      labels: ['automerge']
    })

    core.notice('Added label to release PR');
    core.setOutput('labelAdded', 'true');
    labelAdded = true;
  } else {
    core.notice('No release PR found');
    core.setOutput('labelAdded', 'false');
  }

  return labelAdded;
}