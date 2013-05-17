<?php

class ManagementApiReference {

  /** @var Google_AnalyticsService $analytics */
  private $analytics;

  /** @var string $error */
  private $error = null;

  function __construct(&$analytics) {
    $this->analytics = $analytics;
  }
  
  function getHtmlOutput() {
    $output = '';

    try {
      $output = $this->getTraverseManagementApiHtml();
    } catch (Google_ServiceException $e) {
      $this->error = $e->getMessage();
    } catch (Google_Exception $e) {
      $this->error = $e->getMessage();
    } 
    return $output;
  }

  /* The first account ID is used to then query the webproperties collection. */
  private function getTraverseManagementApiHtml() {
    $accounts = $this->analytics->management_accounts
                     ->listManagementAccounts();

    $html = $this->getAccountsHtml($accounts);

    if (count($accounts->getItems()) > 0) {

      $firstAccountId = $this->getFirstId($accounts);
      $webproperties = $this->analytics->management_webproperties
                            ->listManagementWebproperties($firstAccountId);
      $html .= $this->getWebpropertiesHtml($webproperties);

      if (count($webproperties->getItems()) > 0) {

        $firstWebpropertyId = $this->getFirstId($webproperties);
        $profiles = $this->analytics->management_profiles
                         ->listManagementProfiles($firstAccountId,
                                                  $firstWebpropertyId);
        $html .= $this->getProfilesHtml($profiles);

        if (count($profiles->getItems()) > 0) {
          $firstProfileId = $this->getFirstId($profiles);
          $goals = $this->analytics->management_goals
                        ->listManagementGoals($firstAccountId,
                                              $firstWebpropertyId,
                                              $firstProfileId);
          $html .= $this->getGoalsHtml($goals);

        }
      }
    }

    $segments = $this->analytics->management_segments
                     ->listManagementSegments();

    $html .= $this->getSegmentsHtml($segments);
    return $html;
  }

  /*Returns the first ID of an item in any of the Management API*/
  private function getFirstId(&$collection) {
    $items = $collection->getItems();
    return $items[0]->getId();
  }

  /*Returns important information from the accounts collection.*/
  private function getAccountsHtml(&$accounts) {
    $html = '<h3>Accounts Collection</h3>' .
            $this->getCollectionInfoHtml($accounts);

    $items = $accounts->getItems();

    if (count($items) == 0) {
      $html .= '<p>No Accounts Found</p>';

    } else {
      foreach($items as &$account) {
        $html .= <<<HTML
<hr>
<pre>
Account ID   = {$account->getId()}
Kind         = {$account->getKind()}
Self Link    = {$account->getSelfLink()}
Account Name = {$account->getName()}
Created      = {$account->getCreated()}
Updated      = {$account->getUpdated()}
</pre>
HTML;
      }
    }
    return $html;
  }

  /*Returns important information from the webproperties collection.*/
  private function getWebpropertiesHtml(&$webproperties) {
    $html = '<h3>Webproperties Collection</h3>' .
            $this->getCollectionInfoHtml($webproperties);

    $items = $webproperties->getItems();

    if (count($items) == 0) {
      $html .= '<p>No Web Properties Found</p>';

    } else {
      foreach ($items as &$webproperty) {
        $html .= <<<HTML
<hr>
<pre>
Kind                    = {$webproperty->getKind()}
Account ID              = {$webproperty->getAccountId()}
Webproperty ID          = {$webproperty->getId()}
Internal Webproperty ID = {$webproperty->getInternalWebPropertyId()}
Website URL             = {$webproperty->getWebsiteUrl()}
Created                 = {$webproperty->getCreated()}
Updated                 = {$webproperty->getUpdated()}
Self Link               = {$webproperty->getSelfLink()}
Parent Link
Parent link href        = {$webproperty->getParentLink()->getHref()}
Parent link type        = {$webproperty->getParentLink()->getType()}
Child Link
Child link href         = {$webproperty->getChildLink()->getHref()}
Child link type         = {$webproperty->getChildLink()->getType()}
</pre>
HTML;
      }
    }
    return $html;
  }

  /*Returns important information from the profiles collection.*/
  private function getProfilesHtml(&$profiles) {
    $html = '<h3>Profiles Collections</h3>' . 
            $this->getCollectionInfoHtml($profiles);

    $items = $profiles->getItems();

    if (count($items) == 0) {
      $html .= '<p>No Profiles Found</p>';

    } else {
      foreach ($items as &$profile) {
        $html .= <<<HTML
<hr>
<pre>
Kind                     = {$profile->getKind()}
Account ID               = {$profile->getAccountId()}
Web Property ID          = {$profile->getWebPropertyId()}
Internal Web Property ID = {$profile->getInternalWebPropertyId()}
Profile ID               = {$profile->getId()}
Profile Name             = {$profile->getName()}

Currency                 = {$profile->getCurrency()}
Timezone                 = {$profile->getTimezone()}
Default Page             = {$profile->getDefaultPage()}

Exclude Query Parameters = {$profile->getExcludeQueryParameters()}
Site Search Category Parameters = {$profile->getSiteSearchCategoryParameters()}
Site Search Query Parameters = {$profile->getSiteSearchQueryParameters()}

Created   = {$profile->getCreated()}
Updated   = {$profile->getUpdated()}

Self Link = {$profile->getSelfLink()}
Parent Link
Parent Link href = {$profile->getParentLink()->getHref()}
Parent link type = {$profile->getParentLink()->getType()}
Child Link
Child link href  = {$profile->getChildLink()->getHref()}
Child link type  = {$profile->getChildLink()->getType()}
</pre>
HTML;
      }
    }
    return $html;
  }

  /*Returns important information from the goals collection.*/
  private function getGoalsHtml(&$goals) {
    $html = '<h3>Goals Collections</h3>' .
            $this->getCollectionInfoHtml($goals);

    $items = $goals->getItems();

    if (count($items) == 0) {
      $html .= '<p>No Goals Found</p>';

    } else {
      foreach ($items as &$goal) {
        $html .= <<<HTML
<hr>
<pre>
Goal ID   = {$goal->getId()}
Kind      = {$goal->getKind()}
Self Link = {$goal->getSelfLink()}

Account ID               = {$goal->getAccountId()}
Web Property ID          = {$goal->getWebPropertyId()}
Internal Web Property ID = {$goal->getInternalWebPropertyId()}
Profile ID

Goal Name   = {$goal->getName()}
Goal Value  = {$goal->getValue()}
Goal Active = {$goal->getActive()}
Goal Type   = {$goal->getType()}

Created = {$goal->getCreated()}
Updated = {$goal->getUpdated()}

Parent Link
Parent link href = {$goal->getParentLink()->getHref()}
Parent link type = {$goal->getParentLink()->getHref()}
</pre>
HTML;

        // Now get the HTML for the type of goal.
        switch($goal->getType()) {
          case 'URL_DESTINATION':
            $html .= $this->getUrlDestinationDetailsHtml(
                $goal->getUrlDestinationDetails());
            break;
          case 'VISIT_TIME_ON_SITE':
            $html .= $this->getVisitTimeOnSiteDetailsHtml(
                $goal->getVisitTimeOnSiteDetails());
            break;
          case 'VISIT_NUM_PAGES':
            $html .= $this->getVisitNumPagesDetailsHtml(
                $goal->getVisitNumPagesDetails());
            break;
          case 'EVENT':
            $html .= $this->getEventDetailsHtml(
                $goal->getEventDetails());
            break;
        }
      }
    }
    return $html;
  }

  /*Returns important information for url destination type goals.*/
  private function getUrlDestinationDetailsHtml(&$details) {
    $html = '<h4>Url Destination Goal</h4>';
    $html .= <<<HTML
<pre>
Goal URL            = {$details->getUrl()}
Case Sensitive      = {$details->getCaseSensitive()}
Match Type          = {$details->getMatchType()}
First Step Required = {$details->getFirstStepRequired()}
</pre>
HTML;

  $html .= '<h4>Destination Goal Steps</h4>';
  $steps = $details->getSteps();
  if (count($steps) == 0) {
    $html .= '<p>No Steps Configured</p>';

  } else {
    foreach ($steps as &$step) {
      $html .= <<<HTML
<pre>
Step Number = {$step->getNumber()}
Step Name   = {$step->getName()}
Step URL    = {$step->getUrl()}
</pre>
HTML;
    }
  }

  return $html;
  }

  /* Returns important information for visit time on site type goals. */
  private function getVisitTimeOnSiteDetailsHtml(&$details) {
    $html = '<h4>Visit Time On Site Goal</h4>';
    $html .= <<<HTML
<pre>
Comparison Type  = {$details->getComparisonType()}
Comparison Value = {$details->getComparisonValue()}
</pre>
HTML;
    return $html;
  }

  /*Returns important information for visit number of pages goals.*/
  private function getVisitNumPagesDetailsHtml(&$details) {
    $html = '<h4>Visit Num Pages Goal</h4>';
    $html .= <<<HTML
<pre>
Comparison Type  = {$details->getComparisonType()}
Comparison Value = {$details->getComparisonValue()}
</pre>
HTML;
    return $html;
  }

  /*Returns important information for event goals. */
  private function getEventDetailsHtml(&$details) {
    $html = '<h4>Event Goal</h4><pre>' .
            'Use Event Value = ' . $details->getUseEventValue();

    // Get all the event goal conditions.
    $conditions = $details->getEventConditions();

    // String condition types.
    $stringTypes = array('CATEGORY', 'ACTION', 'LABEL');

    foreach ($conditions as &$condition) {
      $html .= "Event Type = $condition->getEventType()";

      $eventType = $condition->getType();
      if (in_array($eventType, $stringTypes)) {
        // Process CATEGORY, ACTION, LABEL.
        $html .= "Match Type = $condition->getMatchType()" .
                 "Expression = $condition->getExpression()";
      } else {
        // Process VALUE.
        $html .= "Comparison Type  = $condition->getComparisonType()" .
                 "Comparison Value = $condition->getComparisonValue()";
      }
    }

    return $html . '</pre>';
  }

  /* Returns important information from the segments collection.  */
  private function getSegmentsHtml(&$segments) {
    $html = '<h3>Segments Collection</h3>' .
            $this->getCollectionInfoHtml($segments);

    $items = $segments->getItems();

    if (count($items) == 0) {
      $html .= '<p>No Segments Found</p>';
    } else {
      foreach ($items as &$segment) {
        $html .= <<<HTML
<hr>
<pre>
Segment ID = {$segment->getId()}
Kind       = {$segment->getKind()}
Self Link  = {$segment->getSelfLink()}
Name       = {$segment->getName()}
Definition = {$segment->getDefinition()}
Created    = {$segment->getCreated()}
Updated    = {$segment->getUpdated()}
</pre>
HTML;
      }
    }
    return $html;
  }

  /*Returns important information common to each collection in the API.*/
  private function getCollectionInfoHtml(&$collection) {
    $previousLink = $collection->getPreviousLink()
                    ? $collection->getPreviousLink() : 'none';

    $nextLink = $collection->getNextLink()
                ? $collection->getNextLink() : 'none';

    return <<<HTML
<pre>
Username       = {$collection->getUsername()}
Items Per Page = {$collection->getItemsPerPage()}
Total Results  = {$collection->getTotalResults()}
Start Index    = {$collection->getStartIndex()}
Previous Link  = {$previousLink}
Next Link      = {$nextLink}
</pre>
HTML;
  }

  /** @return string Any errors that occurred. */
  function getError() {
    return $this->error;
  }
}
